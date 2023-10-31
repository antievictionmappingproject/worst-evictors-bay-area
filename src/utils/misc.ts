export async function asyncWait(time: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

interface SortableEvictors {
  tags: string[]
  rank: number
}

export function sortEvictors<Type extends SortableEvictors>(
  evictors: Type[]
): Type[] {
  return evictors.sort((a, b) => {
    if (Array.isArray(a.tags) && !Array.isArray(b.tags)) {
      return 1
    } else if (!Array.isArray(a.tags) && Array.isArray(b.tags)) {
      return -1
    }
    return a.rank - b.rank
  })
}
