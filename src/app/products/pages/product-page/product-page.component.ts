import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  //constructor(private fb: FormBuilder) {} //esta es la forma tradicional de inyectar ub FormBuilder para formularioas reactivos, aprenderemos otra forma

  private fb= inject ( FormBuilder ); //esta es la forma alternativa de inyectar en vez de usar el constructor

  public color:string = 'green';

  public myForm: FormGroup = this.fb.group({
    name: ['',[Validators.required,Validators.minLength(6), Validators.email]]
  });

  changeColor(){
    this.color =  '#xxxxxx'.replace(/x/g, y=>(Math.random()*16|0).toString(16));
  }
}



