export const statuses = ['todo','doing','done'];
export const priorities = ['low','normal','high'];
export function task(title, priority='normal', id=crypto.randomUUID()) { title=title.trim(); if (!title || title.length>100 || !priorities.includes(priority)) throw Error('Enter a task name of 1–100 characters.'); return {id,title,priority,status:'todo'}; }
export function validTasks(items) { return Array.isArray(items) && items.every(t => typeof t?.id==='string' && typeof t.title==='string' && t.title.trim().length>0 && t.title.length<=100 && priorities.includes(t.priority) && statuses.includes(t.status)) && new Set(items.map(t=>t.id)).size===items.length; }
export function moveTask(items,id,status) { if (!statuses.includes(status)) throw Error('Unknown status'); return items.map(t=>t.id===id?{...t,status}:t); }
export function filterTasks(items,query,priority) { return items.filter(t=>t.title.toLowerCase().includes(query.trim().toLowerCase()) && (priority==='all'||t.priority===priority)); }
