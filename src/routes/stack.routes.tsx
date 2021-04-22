import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import colors from '../styles/colors';
import { Welcome } from '../pages/welcome';
import { UserIdentification } from '../pages/userIdentification';
import { Confirmation } from '../pages/confirmation';
import { PlantSelect } from '../pages/plantSelect';
import { PlantDetails } from '../pages/plantDetails';
import { MyPlants } from '../pages/myPlants';
import AuthRoutes from './tabs.routes';

const stackRoutes = createStackNavigator();


const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    headerMode="none"
    screenOptions={{
      cardStyle: {
        backgroundColor: colors.white
      },
    }}
  >
    <stackRoutes.Screen
      name="Welcome"
      component={Welcome}
    />
    <stackRoutes.Screen
      name="UserIdentification"
      component={UserIdentification}
    />
    <stackRoutes.Screen
      name="Confirmation"
      component={Confirmation}
    />
    <stackRoutes.Screen
      name="PlantSelect"
      component={AuthRoutes}
    />
    <stackRoutes.Screen
      name="PlantDetails"
      component={PlantDetails}
    />
    <stackRoutes.Screen
      name="MyPlants"
      component={AuthRoutes}
    />

  </stackRoutes.Navigator>
)


export default AppRoutes;
