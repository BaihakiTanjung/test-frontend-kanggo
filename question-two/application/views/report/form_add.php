<div class="container">
	<div class="card mt-3">
			<div class="card-body">
				<form method="POST" action="<?= base_url('report/create') ?>">
					<div class="form-group">
						<label for="name">Nama:</label>
						<input type="text" class="form-control" name="name" id="name" required>
					</div>
				<button type="submit" class="btn btn-primary">Save</button>
			</form>
		</div>
	</div>
</div>


