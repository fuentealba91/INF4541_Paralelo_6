import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroDeportistas'
})
export class FiltroDeportistasPipe implements PipeTransform {

  transform(value: any, arg: any): any
  {
    const resultado: string[] = [];

    if(arg === "")
    {
      return value;
    }

    for(const campos of value)
    {
      if(campos.idDeporte.indexOf(arg) > -1)
      {
        resultado.push(campos);
      }
    }
    return resultado;
  }
}
