import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
   const [tasks, setTasks] = useState<Task[]>([]);

   function handleAddTask(newTaskTitle: string) {
      setTasks((tasks: Task[]) => [...tasks, {
         id: new Date().getMilliseconds(),
         title: newTaskTitle,
         done: false
      }])
      ToastAndroid.show(`Tarefa ${newTaskTitle} adicionada.`, ToastAndroid.SHORT)
   }

   function handleToggleTaskDone(id: number) {
      const doneTasks: Task[] = tasks.map(item => {
         if (item.id === id) {
            item.done = !item.done
            ToastAndroid
               .show(`Tarefa ${item.title} ${item.done ? 'concluida' : 'não concluida'}.`,
                  ToastAndroid.SHORT)
         }
         return item
      })
      setTasks(doneTasks)
   }

   function handleRemoveTask(id: number) {
      setTasks(tasks.filter(item => {
         if (item.id == id)
            ToastAndroid.show(`Tarefa ${item.title} apagada`, ToastAndroid.SHORT)
         return item.id !== id
      }))
   }

   return (
      <View style={styles.container}>
         <Header tasksCounter={tasks.length} />

         <TodoInput addTask={handleAddTask} />

         <TasksList
            tasks={tasks}
            toggleTaskDone={handleToggleTaskDone}
            removeTask={handleRemoveTask}
         />
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#EBEBEB'
   }
})