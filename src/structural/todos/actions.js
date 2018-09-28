export const loadTodos = (resource) => ({
    type: 'LOAD_TODOS',
    resourceId: resource.resourceId,
    resourceType: resource.resourceType
})