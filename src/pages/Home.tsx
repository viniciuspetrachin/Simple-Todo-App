import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'

import { Header } from '../components/Header'
import { Task, TasksList } from '../components/TasksList'
import { TodoInput } from '../components/TodoInput'

export function Home() {
	const [tasks, setTasks] = useState<Task[]>([])

	function handleAddTask(newTaskTitle: string) {
		if (tasks.find((task) => task.title === newTaskTitle)) {
			Alert.alert(
				'Task já cadastrada',
				'Você não pode cadastrar uma task com o mesmo nome',
				[
					{
						style: 'cancel',
						text: 'Ok',
					},
				]
			)
			return
		}
		setTasks((oldTasks) => [
			...oldTasks,
			{
				id: new Date().getTime(),
				title: newTaskTitle,
				done: false,
			},
		])
	}

	function handleToggleTaskDone(id: number) {
		const updatedTasks = tasks.map((task) => {
			if (task.id === id) {
				return {
					...task,
					done: !task.done,
				}
			}
			return { ...task }
		})
		setTasks(updatedTasks)
	}

	function handleRemoveTask(id: number) {
		Alert.alert(
			'Remover item',
			'Tem certeza que você deseja remover esse item?',
			[
				{
					style: 'cancel',
					text: 'Não',
					onPress: () => {},
				},
				{
					style: 'destructive',
					text: 'Sim',
					onPress: () => {
						setTasks((oldTasks) =>
							oldTasks.filter((task) => task.id !== id)
						)
					},
				},
			]
		)
	}

	function handleEditTask(taskId: number, taskNewTitle: string) {
		const updatedTasks = tasks.map((task) => {
			if (task.id === taskId) {
				return {
					...task,
					title: taskNewTitle,
				}
			}
			return { ...task }
		})
		setTasks(updatedTasks)
	}

	return (
		<View style={styles.container}>
			<Header tasksCounter={tasks.length} />

			<TodoInput addTask={handleAddTask} />

			<TasksList
				tasks={tasks}
				toggleTaskDone={handleToggleTaskDone}
				removeTask={handleRemoveTask}
				editTask={handleEditTask}
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
