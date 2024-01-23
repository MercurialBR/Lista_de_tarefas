import { Component } from '@angular/core';
import { ActionSheetButton, ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { TarefasService } from 'src/app/services/tarefas.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefaCollection : any[]=[];

  constructor(
    private alertCtrl : AlertController,
    private tarefaService : TarefasService,
    private actionSheetCtrl : ActionSheetController
   ) {}

  ionViewDidEnter(){
    this.listarTarefa();
  }

  listarTarefa(){
    this.tarefaCollection = this.tarefaService.listar();
  }

  async showAdd(){
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Informe a tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Descreva sua tarefa'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm cancel');
          }
        },
        {
          text: 'Salvar',
          handler: (tarefa) => {
            this.tarefaService.salvar(tarefa, () => {
              this.listarTarefa();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  delete(item : any) {
    this.tarefaService.delete(item, () =>
      (this.listarTarefa()))
  }

  async openActions(tarefa : any) {
    const actionSheet: any = await this.actionSheetCtrl.create({
      header: "O que deseja fazer?",
      buttons: [{
        text: tarefa.feito ? 'Marcar como pendente' : 'Marcar como realizado',
        icon: tarefa.feito ? 'time-outline' : 'checkmark-circle',
        handler: () => {
          tarefa.feito = !tarefa.feito;

          this.tarefaService.atualizar(tarefa, ()=> {
            this.listarTarefa();
          })
        }

      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('cancel clicked');
        }
      }]
    });
    await actionSheet.present()
  }
}
