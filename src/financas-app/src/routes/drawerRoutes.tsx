import { createDrawerNavigator } from "@react-navigation/drawer";
import { Perfil } from "../screen/drawer/Perfil";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
      return(
            <Drawer.Navigator>
                  <Drawer.Screen
                        name="Perfil"
                        component={Perfil}
                        options={{headerShown: false}}
                  />
            </Drawer.Navigator>
      )
}