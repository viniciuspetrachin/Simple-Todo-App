import React, { useState, useRef, useEffect } from 'react'
import {
	View,
	TouchableOpacity,
	Text,
	Image,
	StyleSheet,
	TextInput,
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import penIcon from '../assets/icons/pen/pen.png'
import trashIcon from '../assets/icons/trash/trash.png'

export interface Task {
	id: number
	title: string
	done: boolean
}

interface TaskItemProps {
	task: Task
	index: number
	toggleTaskDone: (id: number) => void
	removeTask: (id: number) => void
	editTask: (taskId: number, taskNewTitle: string) => void
}

export function TaskItem({
	task,
	index,
	toggleTaskDone,
	removeTask,
	editTask,
}: TaskItemProps) {
	const [editMode, setEditMode] = useState(false)
	const [newTaskTitle, setNewTaskTitle] = useState(task.title)

	const textInputRef = useRef<TextInput>(null)

	function handleStartEditing() {
		setEditMode(true)
	}

	function handleCancelEditing() {
		setNewTaskTitle(task.title)
		setEditMode(false)
	}

	function handleSubmitEditing() {
		editTask(task.id, newTaskTitle)
		setEditMode(false)
	}

	useEffect(() => {
		if (editMode) {
			textInputRef.current?.focus()
		} else {
			textInputRef.current?.blur()
		}
	}, [editMode])

	return (
		<>
			<View>
				<TouchableOpacity
					testID={`button-${index}`}
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress={() => toggleTaskDone(task.id)}>
					<View
						testID={`marker-${index}`}
						style={
							task.done ? styles.taskMarkerDone : styles.taskMarker
						}>
						{task.done && (
							<Icon name='check' size={12} color='#FFF' />
						)}
					</View>

					<TextInput
						value={newTaskTitle}
						onChangeText={setNewTaskTitle}
						editable={editMode}
						onSubmitEditing={handleSubmitEditing}
						style={task.done ? styles.taskTextDone : styles.taskText}
						ref={textInputRef}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.iconsContainer}>
				{editMode ? (
					<TouchableOpacity onPress={handleCancelEditing}>
						<Icon name='x' size={24} color='#B2B2B2' />
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={handleStartEditing}>
						<Image source={penIcon} />
					</TouchableOpacity>
				)}
				<View style={styles.iconDivider} />
				<TouchableOpacity
					testID={`trash-${index}`}
					style={{
						paddingHorizontal: 24,
						opacity: editMode ? 0.2 : 1,
					}}
					onPress={() => removeTask(task.id)}
					disabled={editMode}>
					<Image source={trashIcon} />
				</TouchableOpacity>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	taskButton: {
		flex: 1,
		paddingHorizontal: 24,
		paddingVertical: 15,
		marginBottom: 4,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center',
	},
	taskMarker: {
		height: 16,
		width: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#B2B2B2',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	taskText: {
		color: '#666',
		fontFamily: 'Inter-Medium',
	},
	taskMarkerDone: {
		height: 16,
		width: 16,
		borderRadius: 4,
		backgroundColor: '#1DB863',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	taskTextDone: {
		color: '#1DB863',
		textDecorationLine: 'line-through',
		fontFamily: 'Inter-Medium',
	},
	iconDivider: {
		width: 1,
		height: 24,
		backgroundColor: 'rgba(196, 196, 196, 0.24)',
		marginLeft: 24,
	},
	iconsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
})
