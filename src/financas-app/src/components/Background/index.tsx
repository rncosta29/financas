import { BackgroundApp } from "./styles";

interface Props {
      children: React.ReactNode;
}

export function Background({ children }: Props) {
      return(
            <BackgroundApp>
                  {children}
            </BackgroundApp>
      );
}