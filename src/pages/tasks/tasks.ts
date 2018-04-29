import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { TasksProvider } from '../../providers/tasks/tasks';
import { SprintsProvider } from '../../providers/sprints/sprints';

/**
 * Generated class for the TasksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tasks',
  templateUrl: 'tasks.html',
})
export class TasksPage {
  pageTitle: any;
  tasks: any = [];
  sprintid: any;
  active: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tasksService: TasksProvider,
    public sprintsService: SprintsProvider, public events: Events) {
    this.pageTitle = this.navParams.get('Title');
    this.tasks = this.navParams.get('Tasks');
    this.sprintid = this.navParams.get('SprintId');
    this.active = this.navParams.get('Active');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TasksPage');
    //console.log(this.tasks[0].Description);
  }

  deleteTask(task) {
    console.log("delete");
    var self = this;
    this.tasksService.deleteTask(task.id, this.sprintid, this.tasks).then((remainingTasks) => {
      for (var i = 0; i < self.tasks.length; i++) {
        if (self.tasks[i].id == task.id) {
          self.tasks.splice(i, 1);
          break;
        }
      }
      // self.tasks.forEach(element => {
      //   if (element == task) {
      //     console.log("found task to delete");
      //   } else {
      //     temp.push(element);
      //   }
      // });
      // self.tasks = temp;
      self.sprintsService.updateTasks(remainingTasks, self.sprintid);

      var data = {
        tasks: self.tasks
      }
      if(self.active){
        console.log("hewwooo delete");
        self.events.publish('tasks:changed', data);
      }
      
      //this.events.publish('tasks:changed', data);
    });
    //this.tasksService.deleteTask();
  }

  // moveTask(){
  //   console.log("move");
  // }

  editTask(task) {
    console.log("edit");
    var data = {
      Description: "task test",
      Due: "11/11/11",
      Progress: "complete",
      Size: "M",
      User: "Bea",
      UserID: "",
      id: task.id
    }
    console.log(task.id);
    this.tasksService.editTask(task.id, data);
  }

  addTask() {
    console.log("add");
    var self = this;
    var data = {
      Description: "task test",
      Due: "11/11/11",
      Progress: "complete",
      Size: "S",
      User: "Bea",
      UserID: "",
      id: ""
    }
    //return updated list of tasks and repopulate so that page updates 
    this.tasksService.addTask(data, this.sprintid, this.tasks).then((doc) => {
      data.id = doc.id;
      console.log("new id:" + doc.id);
      self.tasks.push(data);
      console.log("after add" + self.tasks);
      //adds task id to task field
      self.tasksService.editTask(data.id, data);
      if(self.active){
        console.log("hewwwooo");
        self.events.publish('tasks:changed', data);
      }
    });

  }
}
// add/delete/move/edit tasks
// will probs have to pass sprint id all the way through so can delete/move/add tasks
//then edit a sprint
//progress bar
//list of clients
