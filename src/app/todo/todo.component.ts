import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Itask } from '../model/task';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  task : Itask[] = []
  inprogress : Itask [] = [];
  done : Itask[] = [];
  updateIndex : any;
  isEditEnabled : Boolean =false
  constructor(private fb :FormBuilder) { }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    })
  }
  addTask() 
  {
     this.task.push({
      description : this.todoForm.value.item,
      done:false
  });
  this.todoForm.reset();
  }

  onEdit(item :Itask, i : number)
  {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = i;
    this.isEditEnabled = true;

  }

  updateTask() {
    this.task[this.updateIndex].description = this.todoForm.value.item;
    this.task[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
  }

  deleteTask(i: number)
  {
    this.task.splice(i, 1)
  }

  deleteInProgress(i: number)
  {
    this.inprogress.splice(i, 1)
  }

  deleteDone(i: number)
  {
    this.done.splice(i, 1)
  }

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
