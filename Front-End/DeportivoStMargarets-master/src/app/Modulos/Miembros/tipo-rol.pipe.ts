import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipoRol'
})
export class TipoRolPipe implements PipeTransform {

  transform(value: any, arg: any): any
  {
    const resultado: string[] = [];
    console.log(value)
    console.log(arg)
    if(arg === "")
    {
      return value;
    }

    for(const campos of value)
    {
      if(campos.id_rol.indexOf(arg) > -1)
      {
        resultado.push(campos);
      }
    }
    return resultado;
  }
}
