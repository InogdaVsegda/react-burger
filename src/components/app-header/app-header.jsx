import styles from './app-header.module.css';

import { 
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon 
} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
    return (
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.nav_links}>
              <div className={`pl-5 pr-5 pb-4 pt-4 mr-2 ${styles.nav_element}`}>
                  <BurgerIcon type="primary" />
                  <p className={`text text_type_main-default ml-2`}>Конструктор</p>
              </div>
              <div className={`pl-5 pr-5 pb-4 pt-4 ${styles.nav_element}`}>
                  <ListIcon type="secondary" />
                  <p className={`text text_type_main-default ml-2 ${styles.second_color}`}>Лента заказов</p>
              </div>
          </nav>
          <Logo/>
          <div className={`pl-5 pr-5 pb-4 pt-4 ${styles.nav_element}`}>
              <ProfileIcon type="secondary" />
              <p className={`text text_type_main-default ml-2 ${styles.second_color}`}>Личный кабинет</p>
          </div>
        </div>
      </header>
    );
  }
  
export default AppHeader;