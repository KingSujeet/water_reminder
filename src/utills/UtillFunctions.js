
export const getArrayTime = (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}
