import { Component, OnInit, TemplateRef } from '@angular/core';
import { TodoList } from '../todo-list';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoValue: string = ''; 
  todoList: TodoList[] = [
    {
      content: 'Todo 1',
      value: false
    },
    {
      content: 'Todo 2',
      value: false
    },
    {
      content: 'Todo 3',
      value: false
    },
  ]; 

  finishedList: TodoList[] = []; 

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  todoAdd() {
    this.todoList.push({
      content: this.todoValue,
      value: false
    });
    this.todoValue = '';
  }

  changeTodo(i: number) {
    const item = this.todoList.splice(i, 1);
    // console.log(item);
    this.finishedList.push(item[0]);
  }

  finishedTodo(i: number) {
    const item = this.finishedList.splice(i, 1);
    // console.log(item);
    this.todoList.push(item[0]);
  }

  openModal(content: TemplateRef<Element>, i: number, type: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(
      (result) => {
        if(type === 'todoList') {
          this.todoList.splice(i, 1);
        } else {
          this.finishedList.splice(i, 1);
        }
      },
      (reason) => {

      }
    );
  }

}
