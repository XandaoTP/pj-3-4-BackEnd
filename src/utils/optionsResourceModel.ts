export function optionsResourceModel (model: object, invisibleElement: any = null) {
    return { resource: model,
            options: {     
                properties: {
                    ...invisibleElement,
                    createdAt:{
                        isVisible: {
                            list: true, edit: false, create: false, show: true
                        }
                    },                  
                    updatedAt:{
                        isVisible: {
                            list: true, edit: false, create: false, show: true
                        }
                    }
                }
            },
        }
    }