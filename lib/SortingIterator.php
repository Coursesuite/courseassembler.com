<?php

class SortingIterator implements IteratorAggregate {
	private $iterator = null;
	public function __construct(Traversable $iterator, $callback) {
		if (!is_callable($callback)) {
			throw new InvalidArgumentException('Given callback is not callable!');
		}
		$array = iterator_to_array($iterator);
		usort($array, $callback);
		$this->iterator = new ArrayIterator($array);
	}
	public function getIterator() {
			return $this->iterator;
	}
}