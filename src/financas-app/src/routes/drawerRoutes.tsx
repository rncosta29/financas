import { createDrawerNavigator } from "@react-navigation/drawer";
import { Perfil } from "../screen/drawer/Perfil";
import { Cartoes } from "../screen/drawer/Cartoes";
import { Bolsa } from "src/screen/drawer/Bolsa";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
      return(
            <Drawer.Navigator>
                  <Drawer.Screen
                        name="Perfil"
                        component={Perfil}
                        options={{headerShown: false}}
                  />
                  <Drawer.Screen
                        name="Cartões"
                        component={Cartoes}
                        options={{headerShown: false}}
                  />
                  <Drawer.Screen
                        name="Bolsa"
                        component={Bolsa}
                        options={{headerShown: false}}
                  />
            </Drawer.Navigator>
      )
}