<?php
// $feedback is defined in index.php which includes this file
$database = DatabaseFactory::getFactory()->getConnection();
$key = Request::post("lookupkey", true, null, null, '');
$unsub = Request::get("key", true, null, null, '');
$rows = [];
if ($key > "") {
	$model = new LicenceModel("lookup",$key);
	if ($model->loaded()) {
		$query = $database->prepare("SELECT name, company, product, reference, licencekey, starts, ends FROM licence WHERE email=:e");
		$query->execute([':e'=>$model->email]);
		$rows = $query->fetchAll(); // (PDO::FETCH_ASSOC);
	}
}

?>
<div class="uk-section faq-container">
	<div class="uk-container">
		<h1>Account Information</h1>
	</div>
	<?php if (!empty($feedback)) { ?>
	<div class="uk-container">
		<div class="uk-alert-success" uk-alert>
			<p><?php echo $feedback; ?></p>
		</div>
	</div>
	<?php } ?>
	<div class="uk-container">
		<fieldset class="uk-fieldset">
			<form method="POST" action="/account">
			<legend class="uk-legend">Enter a licence key or order reference number</legend>
			<div class="uk-margin-small uk-grid-small uk-grid">
				<div class="uk-width-expand">
					<input class="uk-input uk-form" type="text" placeholder="Enter your licence key" name="lookupkey" value="<?php echo $key; ?>">
				</div>
				<div>
					<button type="submit" class="uk-button uk-button-primary uk-button">Lookup</button>
				</div>
			</div>
			</form>
		</fieldset>
	</div>
	<div class="uk-container uk-margin-large">
	<?php if (!empty($rows)) { ?>
		<table class="uk-table  uk-table-divider  uk-table-justify">
			<thead>
				<tr>
					<th>Name</th>
					<th>Order</th>
					<th>Licence Key</th>
					<th>Details</th>
				</tr>
			</thead><tbody><?php
foreach ($rows as $row) {
	$prod = Product($row->product);
	echo "<tr>";
	echo "<td>", $row->name . '<div class="uk-text-small uk-text-light uk-text-muted">' . $row->company . '</div>', "</td>";
	echo "<td>", RefLink($row->reference), "</td>";
	echo "<td>", $row->licencekey, "</td><td><table class='uk-table-small uk-table-responsive'>";
	if (!empty($prod)) echo "<tr><th>Type:</th><td>", $prod, "</td></tr>";
	echo "<tr><th>Started:</th><td>", Utils::TimestampToDate($row->starts), "</td></tr>";
	if ($row->ends == 0) {
		$cancel_link = GetSubscriptionCancelLink($row->licencekey);
		echo "<tr><th>Subscription:</th><td>Active{$cancel_link}</td></tr>";
	} else {
		echo "<tr><th>Expiry:</th><td>", Utils::TimestampToDate($row->ends), "</td></tr>";
	}
	echo LastUse($row->licencekey);
	echo "</table></td></tr>";
}
			?></tbody>
		</table>
	<?php } ?>
	</div>
</div>

<?php

function Product($product) {
	$name = "";
	switch ($product) {
		case "course-assembler-10": $name = "10 days"; break;
		case "course-assembler-365": $name = "1 year"; break;
		case "course-assembler-30": $name = "30 days"; break;
		// case "video-to-scorm-10": $name = "10 days"; break;
		case "course-assembler-60": $name = "60 days"; break;
		// case "apres-ninja-10": $name = "10 days"; break;
		case "course-assembler-1": $name = "1 day"; break;
		case "demo": $name = "Trial"; break;
		// case "custom": $name = "10 days"; break;
		case "course-assembler-sub": $name = "Yearly"; break;
		case "course-assembler-monthly": $name = "Monthly"; break;
	}
	return $name;
}

function RefLink($reference) {
	$database = DatabaseFactory::getFactory()->getConnection();

	$query = $database->prepare("SELECT param2 FROM log WHERE method_name = 'handleOrder' and param2 LIKE :ref ORDER BY added DESC LIMIT 1");
	$query->execute([':ref' => "%{$reference}%"]);
	$found = $query->fetchColumn();
	if ($found) {
		$data = (object)json_decode($found,false);
		$url = @$data->events[0]->data->invoiceUrl;
		if (!empty($url)) {
			$reference = "<a href='{$url}' target='_blank'>{$reference}</a>";
		}
	}
	return $reference;
}

function LastUse($key) {
	$result = "";
	$database = DatabaseFactory::getFactory()->getConnection();
	$query = $database->prepare("SELECT `date` FROM validate WHERE valid = 1 AND licencekey = :key ORDER BY date DESC LIMIT 1");
	$query->execute([':key' => $key]);
	$found = $query->fetchColumn();
	if ($found) {
		$result = "<tr><th>Last Used:</th><td>" . Utils::TimestampToDate($found) . "</td></tr>";
	}
	return $result;
}

function GetSubscriptionCancelLink($reference) {
	$database = DatabaseFactory::getFactory()->getConnection();
	$query = $database->prepare("SELECT param2 FROM log WHERE method_name = 'handleOrder' and param2 LIKE :ref ORDER BY added DESC LIMIT 1");
	$query->execute([':ref' => "%{$reference}%"]);
	$found = $query->fetchColumn();
	if ($found) {
		$data = (object)json_decode($found,false);
		$subscription_id = @$data->events[0]->data->items[0]->subscription->id;
		if (!empty($subscription_id)) {
			$encoded = urlencode($subscription_id);
			return " - <a href='/account/unsubscribe/{$encoded}/'>Cancel subscription</a>";
		}
	}
	return "";
}