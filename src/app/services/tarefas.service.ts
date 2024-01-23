import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TarefasService {

  tarefaCollection: any[] = [];
  key = 'tarefaCollection';

  constructor() { }

  salvar(tarefa: any, callback: any = null) {
    tarefa.feito = false;

    //obter do localStorage
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      this.tarefaCollection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.tarefaCollection));
    }
    else {
      let collection: any[] = JSON.parse(value);
      collection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(collection));
    }
    if (callback != null) {
      callback();
    }
  }
  listar() {
    // obter do localStorage
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      return[];
    }
    let collection: any[] = JSON.parse(value);
    return collection;
  }

  delete(tarefa : any, callback: any = null){

    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      return;
    }

    let collection: any[] = JSON.parse(value);

    let resultCollection = collection.filter(item => {
      return item.tarefa != tarefa.tarefa
    });

    localStorage.setItem(this.key, JSON.stringify(resultCollection));

    if (callback != null){
      callback();
    }
  }

  atualizar(tarefa : any, callback : any = null){
    //obter do localStorage
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      return;
    }
    else {
      let collection: any[] = JSON.parse(value);
      collection.forEach(item=>{
        if(item.tarefa == tarefa.tarefa){
          item.feito = tarefa.feito;
        }
      })

      localStorage.setItem(this.key, JSON.stringify(collection));
    }
    if (callback != null) {
      callback();
    }
  }
}
