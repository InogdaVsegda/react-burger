import React from 'react'
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import style from './burger-constructor-item.module.css';

function BurgerConstructorItem({
    id,
    index,
    product,
    handleClose,
}) {
    const dispatch = useDispatch()

    const [{ isItPicked }, dragRef] = useDrag({
        type: 'dragItem',
        canDrag: true,
        item: {
            index,
        },
        collect(monitor) {
            return {
                isItPicked: monitor.isDragging(),
            };
        },
    });

    const [{ isCanDrop, isDragOver }, dropRef] = useDrop({
        accept: 'dragItem',
        canDrop() {
            return true
        },
        collect(monitor) {
            return {
            isCanDrop: monitor.canDrop(),
            isDragOver: monitor.isOver(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const clientOffset = monitor.getClientOffset()
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            dispatch({ type: 'MOVE_INGR', payload: { fromIndex: dragIndex, toIndex: hoverIndex } })
            item.index = hoverIndex
        },
    });

    const ref = React.useRef()

    dragRef(dropRef(ref))

    return (
        <div
            ref={ref}
            className={
                [style['burger-constructor-item'],
                {
                  [style['burger-constructor-item_is-picked']]: isItPicked,
                  [style['burger-constructor-item_is-can-drop']]: isCanDrop,
                  [style['burger-constructor-item_is-drag-over']]: isDragOver,
                },
                ]
            }
        >
            <div key={index}>
                <span ref={dragRef} className='mr-2'>
                    <DragIcon type="primary" />
                </span>

                <ConstructorElement
                    key={index}
                    text={product.name}
                    price={product.price}
                    thumbnail={product.image}
                    handleClose={() => handleClose(id, index)}
                />
            </div>
        </div>
    )
}

export default BurgerConstructorItem;
