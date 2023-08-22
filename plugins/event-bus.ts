import mitt from 'mitt'

interface ModifyTitle {
  id: number
  title: string
}

type ApplicationEvents = {
  'delete-custom': number
  'modify-title': ModifyTitle
  'is-avatar': void
}

export default defineNuxtPlugin(() => {
  // Then we just inform mitt about our event types
  const emitter = mitt<ApplicationEvents>()

  return {
    provide: {
      emits: emitter.emit, // Will emit an event
      on: emitter.on // Will register a listener for an event
    }
  }
})
