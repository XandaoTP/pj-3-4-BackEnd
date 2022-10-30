export function optionsResourceModel (model: object) {
    return { resource: model,
            options: {
                properties: {
                    createdAt:{
                        isVisible: {
                            list: true, edit: false, create: false
                        }
                    },
                    updatedAt:{
                        isVisible: {
                            list: true, edit: false, create: false
                        }
                    }
                }
            },
        }
    }