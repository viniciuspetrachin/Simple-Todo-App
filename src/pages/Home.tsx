import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

type EditTaskProps = {
	taskId: number
	taskNewTitle: string
}

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
		Alert.alert(
			'Remover item',
			'Tem certeza que você deseja remover esse item?',
			[
				{
					style: 'cancel',
					text: 'Não',
				},
				{
					style: 'destructive',
					text: 'Sim',
					onPress: () =>
						setTasks(tasks.filter((item) => item.id !== id)),
				},
			]
		)
	}

	function handleEditTask({ taskId, taskNewTitle }: EditTaskProps) {
		const newTasks = tasks.map((task) => ({ ...task }))
		const taskToBeEdited = newTasks.find((task) => task.id === taskId)
		if (taskToBeEdited) {
			taskToBeEdited.title = taskNewTitle
			setTasks(newTasks)
		}
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
