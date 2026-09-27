import {$, escapeHTML as h, storage, notice} from './common.js';
import {task, validTasks, moveTask, filterTasks, statuses} from './domain.js';
const saved=storage('flowboard-v1',[],validTasks); let tasks=saved.value, editing=null, deleted=null;
const labels={todo:'To do',doing:'In progress',done:'Done'};
function render(){
 const shown=filterTasks(tasks,$('#search').value,$('#filter').value);
 $('#summary').textContent=tasks.filter(t=>t.status==='done').length+' of '+tasks.length+' tasks complete';
 $('#board').innerHTML=statuses.map(status=>{const column=shown.filter(t=>t.status===status);return '<section class="column"><div class="column-title"><h2>'+labels[status]+'</h2><span>'+column.length+'</span></div>'+column.map(t=>'<article class="card"><span class="priority '+t.priority+'">'+t.priority+'</span><h3>'+h(t.title)+'</h3><label class="field">Move to<select data-move="'+h(t.id)+'" aria-label="Status for '+h(t.title)+'">'+statuses.map(s=>'<option value="'+s+'" '+(s===t.status?'selected':'')+'>'+labels[s]+'</option>').join('')+'</select></label><div class="actions"><button class="small" data-edit="'+h(t.id)+'">Edit</button><button class="small danger" data-delete="'+h(t.id)+'">Delete</button></div></article>').join('')+(!column.length?'<p class="empty">'+(tasks.length?'No matching tasks here.':'Ready for your first task.')+'</p>':'')+'</section>';}).join('');
 $('#demo').disabled=tasks.length>0; $('#demo').title=tasks.length?'Sample board is available on an empty board.':'';
}
function commit(message){saved.save(tasks);render();if(saved.available)notice(message);}
function resetEdit(){editing=null;$('#task-form').reset();$('#save-task').textContent='+ Add task';$('#cancel-edit').hidden=true;}
$('#task-form').addEventListener('submit',event=>{event.preventDefault();try{const data=new FormData(event.currentTarget);const fresh=task(data.get('title'),data.get('priority'));if(editing)tasks=tasks.map(t=>t.id===editing?{...t,title:fresh.title,priority:fresh.priority}:t);else tasks.push(fresh);resetEdit();commit('Task saved.');}catch(error){notice(error.message);}});
$('#cancel-edit').onclick=resetEdit;
$('#board').addEventListener('change',event=>{if(event.target.dataset.move){tasks=moveTask(tasks,event.target.dataset.move,event.target.value);commit('Task moved.');}});
$('#board').addEventListener('click',event=>{const button=event.target.closest('button');if(!button)return;if(button.dataset.delete){const index=tasks.findIndex(t=>t.id===button.dataset.delete);deleted={task:tasks[index],index};tasks.splice(index,1);if(editing===deleted.task.id)resetEdit();$('#undo').hidden=false;commit('Task deleted. You can undo this.');}if(button.dataset.edit){const t=tasks.find(t=>t.id===button.dataset.edit);editing=t.id;$('#task-form').elements.title.value=t.title;$('#task-form').elements.priority.value=t.priority;$('#save-task').textContent='Save changes';$('#cancel-edit').hidden=false;$('#task-form').elements.title.focus();}});
$('#undo').onclick=()=>{if(deleted){tasks.splice(deleted.index,0,deleted.task);deleted=null;$('#undo').hidden=true;commit('Task restored.');}};
$('#search').oninput=render;$('#filter').onchange=render;
$('#demo').onclick=()=>{if(tasks.length)return;tasks=[task('Sketch a homepage','high'),{...task('Build the navigation'),status:'doing'},{...task('Choose a color palette','low'),status:'done'}];commit('Sample board loaded. Make it your own.');};
render();if(!saved.available)notice('Saved data could not be loaded. New changes will replace it.');
