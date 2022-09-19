import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonAlert } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [presentAlert] = useIonAlert();
  const [todos,setTodos] = useState([
    'Makan','Minum','Jajan'
  ]);
  const [inputText, setInputText] = useState<string>('');
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Todo List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
        </IonHeader>

        <IonList>
          <IonItem>
            <IonInput 
            value={inputText}
            placeholder='Please input todo here...'
            clearInput={true}
            autofocus={true}
            onIonChange={(e) => { setInputText(e.detail.value!);}}
            onKeyPress={(e) => {
              if(e.key === 'Enter'){
                setTodos([
                  inputText,
                  ...todos
                ])
                setInputText(""); //menghapus data isian otomatis
              }
            }}
            />
            
          </IonItem>
        </IonList>

        {todos.map((item,i) => (
          <IonItem>
            <IonLabel>{item}</IonLabel>
            <IonButton fill='clear' size='small' color='danger' onClick={() =>{
              const newTodos = todos.filter((value,index) => {
                return index != i;
              });
              setTodos(newTodos);
            }}
            ><IonIcon icon={trashOutline}></IonIcon>
            </IonButton>
          </IonItem>
        ))}

        <IonButton expand='full' fill='clear' size='small' color='danger' onClick={() =>{
                setTodos([]);
              }}
              >Remove All</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
