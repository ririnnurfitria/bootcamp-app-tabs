import { useState, useContext, useEffect } from "react";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonList,
	IonItem,
	IonInput,
	IonButton,
	IonIcon
} from "@ionic/react";
import "./Tab3.css";

import ListItem from '../components/ListItem';
import { currentUserContext } from '../App';

import dayjs from 'dayjs';
import { addOutline, refreshOutline } from "ionicons/icons";

const Tab3: React.FC = () => {

  	const user = useContext(currentUserContext);

	const [todos, setTodos] = useState(["Makan", "Minum", "Jajan"]);
	const [inputText, setInputText] = useState<string>("");

	const removeTodo = (i: number) => {
		const newTodos = todos.filter((value, index) => {
			return index !== i;
		});
		setTodos(newTodos);
	};
	const removeTodos = () => {
		setTodos([]);
	};

	const submitTodo = () => {
		setTodos([inputText, ...todos]);
		setInputText("");
	};

	const style = {
		author: {
			"text-align" : "center",
			color: "grey"
		},
	}; 

	const [version, setVersion] = useState<number>(0)

	const refreshVersion = () => {
		const v = localStorage.getItem('AppVersion');
		setVersion(Number(v));
	};

	const incrVersion = () => {
		localStorage.setItem('AppVersion', String(version + 1));
		refreshVersion();
	};

	useEffect(() => {
		refreshVersion();
	},[]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle className="ion-text-center" style={{ color: "darkBlue", fontSize: "36px"}}>My Planner</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Todos</IonTitle>
					</IonToolbar>
				</IonHeader>

				<h5 style={style.author}>Author: {user} | Version {version}
					<IonButton fill="clear" onClick={refreshVersion}>
						<IonIcon icon={refreshOutline}/>
					</IonButton>
					<IonButton fill="clear" onClick={incrVersion}>
						<IonIcon icon={addOutline}/>
					</IonButton>
				</h5>
				<p className="show-date">Today : {dayjs().format('DD/MM/YYYY')}</p>
				<IonList>
					<IonItem>
						<div className="show-icon"></div>
						<IonInput
							value={inputText}
							placeholder="Please input todo here ..."
							clearInput={true}
							autofocus={true}
							onIonChange={(e) => {
								setInputText(e.detail.value!);
							}}
							onKeyPress={(e) => {
								if (e.key === "Enter") {
									submitTodo();
								}
							}}
						/>
					</IonItem>
				</IonList>

				{todos.map((item, i) => (
					<ListItem
						text={item}
						onClick={() => {
							removeTodo(i);
						}}
					/>
				))}
				{todos.length ? (
					<IonButton
						onClick={removeTodos}
						expand="full"
						fill="clear"
						size="small"
						color="danger"
					>
						Remove all todos
					</IonButton>
				) : null}
			</IonContent>
		</IonPage>
	);
};

export default Tab3;