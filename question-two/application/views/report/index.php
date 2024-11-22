<div class="mt-4">
    <h3>Data Report</h3>
	
	<div class="d-flex justify-content-end">
		<div>
				<a href="<?php echo base_url('report/add'); ?>" class="btn btn-primary">Add</a>
		</div>
	</div>

    <table id="reportTable" class="display table table-striped">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($data as $row): ?>
                <tr>
                    <td><?php echo $row['id']; ?></td>
                    <td><?php echo $row['name']; ?></td>
					<td>
						<a href="<?php echo base_url('report/edit/' . $row['id']); ?>" class="btn btn-warning">Edit</a>
						<button id="btn-delete" data-id="<?= $row['id'] ?>" class="btn btn-danger">Delete</a>
					</td>
                </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>

<script>
	$(document).ready(function() {
        new DataTable('#reportTable');
    });

	$('#reportTable').on('click', '#btn-delete', function (e) {
    e.preventDefault();

    let id = $(this).data('id');

    if (confirm('Are you sure you want to delete this record?')) {
        $.ajax({
			url: '<?= base_url('report/delete/') ?>' + id,
			type: 'POST',
			success: function (data) {
				location.reload();
			}
		});
    }
});
</script>
