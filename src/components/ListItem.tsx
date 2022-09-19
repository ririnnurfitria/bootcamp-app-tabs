import { IonItem, IonLabel, IonButton, IonIcon } from "@ionic/react";
import { prototype } from "events";
import { trashOutline } from "ionicons/icons";

interface IListItemProps {
	text: string;
	onClick: () => void;
}

const ListItem: React.FC<IListItemProps> = ({ text, onClick }) => (
	<IonItem>
		<IonLabel>{text}</IonLabel>
		<IonButton fill="clear" color="danger" onClick={onClick}>
			<IonIcon icon={trashOutline}/>
		</IonButton>
	</IonItem>
);

export default ListItem;