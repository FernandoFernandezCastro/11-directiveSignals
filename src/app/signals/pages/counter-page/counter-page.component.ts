import { Component, computed, signal } from '@angular/core';

@Component({
  templateUrl: './counter-page.component.html',
  styleUrl: './counter-page.component.css'
})
export class CounterPageComponent {
  public counter = signal(10); //este signal se puede modificar

  //computed crea un signal q no se puede modificar por eso no tiene lo metodos set, update, mute
  public squareCounter = computed( () => this.counter() * this.counter() ); //computed hace que si cambian las señales que estan dentro entonces se volvera a computar la funcion interna y ese valor lo pasa a la variable squreCounter

  increaseBy ( value: number ) {

    this.counter.update( current => current + value);

  }


}
