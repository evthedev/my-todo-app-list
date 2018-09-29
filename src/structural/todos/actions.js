export const loadTodos = (resourceId, resourceType) => ({
    type: 'LOAD_TODOS',
    resourceId: resourceId,
    resourceType: resourceType
})

export const updateTodoItem = (updatedTodoItem) => ({
    type: 'UPDATE_TODO_ITEM',
    updatedTodoItem
})