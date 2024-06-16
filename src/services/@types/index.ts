type Key = {
  dir: string
  vendor: string
}

type Value = {
  comments: string | undefined
  state: string
}

const EMPTY_VALUE: Value = {
  comments: undefined,
  state: '-'
}

export { EMPTY_VALUE, type Key, type Value }
