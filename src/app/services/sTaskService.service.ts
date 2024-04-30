import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class sTaskService {
  taskCompleted$ = this.socket.fromEvent('task_completed');

  constructor(private socket: Socket) {
    this.socket.on('connect', () => {
      console.log('Conectado al servidor de sockets');
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor de sockets');
    });

    this.socket.on('error', (error: any) => {
      console.error('Error en la conexión del socket:', error);
    });
  }

  runTask() {
    console.log("run task");
    this.socket.emit('run_task');
  }
}
