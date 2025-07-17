import { ContactsIcon } from "@/assets/images/tab-icons/contacts-icon";
import { HomeIcon } from "@/assets/images/tab-icons/home-icon";
import { ResourcesIcon } from "@/assets/images/tab-icons/resources-icon";
import { SvgProps } from "react-native-svg";

interface TabIconInfo {
    name:string;
    Icon:(props:SvgProps) => React.JSX.Element;
};

export const tabIconArray: TabIconInfo[] = [
  {name:'Início', Icon:HomeIcon},
  {name:'Recursos', Icon:ResourcesIcon},
  {name:'Contatos', Icon:ContactsIcon},
]
