const test = require('tape')
const accumulator = require('./index')

test('accumulating differences', t => {
	const originalData = {
		firstName: 'Bilbo',
		lastName: 'Baggins'
	}
	const acc = accumulator(originalData)
	acc.accumulate({ firstName: 'Frodo' })
	const diff = acc.difference()
	t.deepEqual(diff, { firstName: 'Frodo' })
	acc.clear()
	const diffAfterClear = acc.difference()
	t.deepEqual(diffAfterClear, {})
	t.end()
})

test('accumulating differences when no original data is given', t => {
	const acc = accumulator()
	acc.accumulate({ firstName: 'Frodo' })
	acc.accumulate({
		relationships: {
			uncle: 'Bilbo'
		}
	})
	const diff = acc.difference()
	t.deepEqual(diff, {
		firstName: 'Frodo',
		relationships: { uncle: 'Bilbo' }
	})
	t.end()
})

test('accumulating undefined still shows a delta', t => {
	const acc = accumulator({ firstName: 'Bilbo' })
	acc.accumulate({ firstName: undefined })
	const diff = acc.difference()
	t.deepEqual(diff, { firstName: undefined })
	t.end()
})

test('accumulating values identical to original will not accumulate', t => {
	const acc = accumulator({ firstName: 'Bilbo' })
	acc.accumulate({ firstName: 'Bilbo' })
	const diff = acc.difference()
	t.deepEqual(diff, {})
	t.end()
})

test('accumulating values identical to original will not accumulate', t => {
	const acc = accumulator({})
	acc.accumulate({ firstName: undefined })
	const diff = acc.difference()
	t.equal(Object.keys(diff)[0], 'firstName')
	t.ok(diff.firstName === undefined)
	t.end()
})
