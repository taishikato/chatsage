'use server'

import { redirect } from 'next/navigation'

import { type Chat } from '@/lib/types'

export async function getChats(userId?: string | null) {
  /**
   * instead of kv, i need to fetch data from dtabase or localStorage
   */
  return []

  // if (!userId) {
  //   return []
  // }

  // try {
  //   const pipeline = kv.pipeline()
  //   const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
  //     rev: true
  //   })

  //   for (const chat of chats) {
  //     pipeline.hgetall(chat)
  //   }

  //   const results = await pipeline.exec()

  //   return results as Chat[]
  // } catch (error) {
  //   return []
  // }
}

export async function getChat(id: string, userId: string) {
  /**
   * instead of kv, i need to fetch data from dtabase or localStorage
   */
  return null

  // const chat = await kv.hgetall<Chat>(`chat:${id}`)

  // if (!chat || (userId && chat.userId !== userId)) {
  //   return null
  // }

  // return chat
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  // const session = await auth()

  // if (!session) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }

  // //Convert uid to string for consistent comparison with session.user.id
  // const uid = String(await kv.hget(`chat:${id}`, 'userId'))

  // if (uid !== session?.user?.id) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }

  // await kv.del(`chat:${id}`)
  // await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

  // revalidatePath('/')
  // return revalidatePath(path)

  return
}

export async function clearChats() {
  /**
   * Instead of changing kv, i need to clear the localStorage or somewhere else.
   */
  return redirect('/')

  // const session = await auth()
  // if (!session?.user?.id) {
  //   return {
  //     error: 'Unauthorized'
  //   }
  // }
  // const chats: string[] = await kv.zrange(`user:chat:${session.user.id}`, 0, -1)
  // if (!chats.length) {
  //   return redirect('/')
  // }
  // const pipeline = kv.pipeline()
  // for (const chat of chats) {
  //   pipeline.del(chat)
  //   pipeline.zrem(`user:chat:${session.user.id}`, chat)
  // }
  // await pipeline.exec()
  // revalidatePath('/')
  // return redirect('/')
}

export async function saveChat(chat: Chat) {
  /**
   * Instead of kv, i need to store them on Supabase
   */
  return
  // const session = await auth()
  // if (session && session.user) {
  //   const pipeline = kv.pipeline()
  //   pipeline.hmset(`chat:${chat.id}`, chat)
  //   pipeline.zadd(`user:chat:${chat.userId}`, {
  //     score: Date.now(),
  //     member: `chat:${chat.id}`
  //   })
  //   await pipeline.exec()
  // } else {
  //   return
  // }
}

export async function refreshHistory(path: string) {
  redirect(path)
}

export async function getMissingKeys() {
  const keysRequired = ['OPENAI_API_KEY']
  return keysRequired
    .map(key => (process.env[key] ? '' : key))
    .filter(key => key !== '')
}
