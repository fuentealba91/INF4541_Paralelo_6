import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroCategoria'
})
export class FiltroCategoriaPipe implements PipeTransform {

  transform(value: any, arg: any): any
  {
    const resultado: string[] = [];

    if(arg === "")
    {
      return value;
    }

    for(const campos of value)
    {
      if(campos.idCategoria.indexOf(arg) > -1)
      {
        resultado.push(campos);
      }
    }
    return resultado;
  }

}
