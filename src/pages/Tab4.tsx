import { useEffect, useState } from "react";
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
	IonRouterLink,
} from "@ionic/react";
import "./Tab4.css";

import ListItem from '../components/ListItem';

const Tab4: React.FC = () => {

	const [todos, setTodos] = useState([""]);
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

	const syncTodos = () => {
		fetch('http://localhost:3000/todos', {
		method: 'PUT',
		body: JSON.stringify(todos),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
		})
		.then((response) => response.json())
		.then((json) => console.log(json));
	};

	const submitTodo = () => {
		setTodos([inputText, ...todos]);
		setInputText("");
	};

	useEffect(()=> {
		fetch('http://localhost:3000/todos')
		.then((response) => response.json())
		.then((data) => {
			const newTodos = data.map((item) => {
				return item.todo;
			})
			return newTodos;
		})
		.then((data) => setTodos(data));
	}, []);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>My Planner</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonHeader collapse="condense">
					<IonToolbar>
						<IonTitle size="large">Todos</IonTitle>
					</IonToolbar>
				</IonHeader>

				<IonList>
					<IonItem>
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
				{todos.length ? (
					<IonButton
						onClick={syncTodos}
						expand="full"
						fill="clear"
						size="small"
						color="info"
					>
						Sync all todos
					</IonButton>
				) : null}
				<IonButton routerLink="/tab3">Move to Tab 3 (with Button)</IonButton><br/>
				<IonRouterLink routerLink="/tab3">Move to Tab 3 (with RouterLink)</IonRouterLink><br/>
				<a href="/tab3">Move to Tab 3 (with a href)</a>
			</IonContent>
		</IonPage>
	);
};

export default Tab4;