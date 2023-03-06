<?php
class StatisticsModel extends dbRow {

    CONST TABLE_NAME = "statistics";

    // look up via id (internal) or licencekey (api validation)
    public function __construct($lookup = "id", $match = "")
    {
        if ($lookup === "id" && is_numeric($match) && intval($match,10) > 0) {
	        parent::__construct(self::TABLE_NAME, $match);
        } else if ($lookup === "stat" && trim($match) > "") {
            parent::__construct(self::TABLE_NAME,["stat=:k", [":k"=>$match]]);
        } else {
        	parent::__construct(self::TABLE_NAME);
        }
        return $this;
    }

    public function increment() {
        $count = intval($this->total,10);
        $this->total = $count + 1;
    }

}