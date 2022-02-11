import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
	const [tasks, setTasks] = useState<Task[]>([])

	function handleAddTask(newTaskTitle: string) {
		const taskWithSameTitle = tasks.find(
			(task) => task.title === newTaskTitle
		)

		if (taskWithSameTitle) {
			return Alert.alert(
				'Tarefa já cadastrada',
				'Você não pode cadastrar uma task com o mesmo nome'
			)
		}

		setTasks((tasks: Task[]) => [
			...tasks,
			{
				id: new Date().getMilliseconds(),
				title: newTaskTitle,
				done: false,
			},
		])
	}

	function handleToggleTaskDone(id: number) {
		const doneTasks: Task[] = tasks.map((item) => {
			if (item.id === id) item.done = !item.done
			return item
		})
		setTasks(doneTasks)
	}

	function handleRemoveTask(id: number) {
		setTasks(tasks.filter((item) => item.id !== id))
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
		backgroundColor: '#EBEBEB',
	},
})
