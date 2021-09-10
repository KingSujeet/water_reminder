import React, { useState } from 'react'
import { useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';

import HomeTab from './HomeTab';
import Strings from '../../../assets/strings';
import SettingTab from './SettingTab';

  const renderScene = SceneMap({
    home: HomeTab,
    setting: SettingTab,
  });

  export default function TabScreen () {

    const layout = useWindowDimensions();

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: Strings.HomeTabKey, title: Strings.HomeTabName },
      { key: Strings.SettingTabKey, title: Strings.SettingTabName },
    ]);

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
        />
    )
}
