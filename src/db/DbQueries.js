const Queries = {
    
    // Splash screen Queries ------>
        get_daily_water_amount:'SELECT daily_water_amount FROM table_user',
        update_waterAmount_consumedwater_todayDate:'UPDATE table_user set water_amount=?, consumed_water_amount=?, today_date=?',

        select_table_user_table:"SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        drop_table_user:'DROP TABLE IF EXISTS table_user',
        create_table_user_table:'CREATE TABLE IF NOT EXISTS table_user(id INTEGER PRIMARY KEY AUTOINCREMENT, daily_water_amount INT(5), consumed_water_amount INT(5), water_amount INT(5), reminder INT(5), is_reminder_sch VARCHAR(5), wake_up_time VARCHAR(5), sleeping_time VARCHAR(5), today_date VARCHAR(5))',

        select_today_date:'SELECT today_date FROM table_user',
    // <----- end Splash screen queries

    // ChooseSleepingTime screen Queries ------>
        insert_data_to_table_user_table:'INSERT INTO table_user (daily_water_amount, consumed_water_amount, water_amount, reminder, is_reminder_sch, wake_up_time, sleeping_time, today_date ) VALUES (?,?,?,?,?,?,?,?)',
    // <----- end ChooseSleepingTime screen queries

    // Home screen Queries ------>
        update_is_reminder_sch:'UPDATE table_user set is_reminder_sch=?',
        select_reminder_is_reminder_sch:'SELECT reminder, is_reminder_sch FROM table_user',
    // <----- end Home screen queries

    // Setting Tab Queries ------>
        select_reminder:'SELECT reminder FROM table_user',
        update_is_reminder_sch:'UPDATE table_user set is_reminder_sch=?',
        update_reminder_is_reminder_sch:'UPDATE table_user set reminder=?, is_reminder_sch=?',
    // <----- end Home screen queries

    // Home tab Queries ------>
        select_consumed_water_amount_daily_water_amount_water_amount:'SELECT consumed_water_amount, daily_water_amount, water_amount FROM table_user',
        
        select_record_list_table:"SELECT name FROM sqlite_master WHERE type='table' AND name='record_list'",
        drop_record_list: 'DROP TABLE IF EXISTS record_list',
        create_record_list_table:'CREATE TABLE IF NOT EXISTS record_list(id INTEGER PRIMARY KEY AUTOINCREMENT, time_of_drink VARCHAR(5), consumed_water_amount INT(5))',

        select_lis_from_record_list:'SELECT * FROM record_list',
        insert_data_into_record_list_table:'INSERT INTO record_list ( time_of_drink, consumed_water_amount) VALUES (?,?)',
        update_consumed_water_amount_and_water_amount:'UPDATE table_user set consumed_water_amount=?, water_amount=?',
    // <----- end Home tab queries

 }
 
 export default Queries