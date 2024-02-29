import { Component, OnDestroy, computed, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrl: './properties-page.component.css'
})
export class PropertiesPageComponent  implements OnDestroy{

  public counter = signal(10);

  public user = signal<User>({
    "id": 2,
    "email": "janet.weaver@reqres.in",
    "first_name": "Janet",
    "last_name": "Weaver",
    "avatar": "https://reqres.in/img/faces/2-image.jpg"
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name}` );

  //este signal se ejecuta la primera vez al ingresar al componente y luego se activa cada vez que cambia algun signal que esta referenciado dentro
  //ademas se destruye autamticamente al salir del componente.
  public userChangeeffect = effect( () => {
    console.log(`${ this.user().first_name } - ${ this.counter() }`);

  } );

  ngOnDestroy(): void {
    //this.userChangeeffect.destroy(); //el effect se destruye automaticamnete al salir del componente pero si queremos destruirlo manualmente usamos destroy()
  }

  onFieldUpdated ( field: keyof User, value: string ){ //keyof es para el parametro que manden solo pueda ser la llave de algun atributo de User
    //esta es una forma de actualizar solo un campo del signal, pero puede crar campos si no lo contralomnos como con el keyof
    /*this.user.set({
         ...this.user(),
         [field]: value,
    });*/

    //esta es otra forma

    this.user.update( current => {
      switch ( field ){
        case 'email':
          current.email = value;
          break;

        case 'avatar':
          current.avatar = value;
          break;

        case 'first_name':
          current.first_name = value;
          break;

        case 'last_name':
          current.last_name = value;
          break;

        case 'id':
          current.id = Number( value );
          break

      }
      return ({...current}); //para que computed o effect detecte el cambio se debe devolcver otra referencia del objeto con ... se hace eso
    })
  }

  increaseBy( value: number){
    this.counter.update ( current => current +value );
  }

}
