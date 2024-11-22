<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Report extends CI_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Report_model');
    }

    // Menampilkan halaman utama
    public function index() {
        $data['data'] = $this->Report_model->get_data(); // Ambil data dari model

        $this->load->view('layouts/header');
        $this->load->view('report/index', $data);
        $this->load->view('layouts/footer');
    }

    public function add() {
		$this->load->view('layouts/header');
		$this->load->view('report/form_add');
		$this->load->view('layouts/footer');
    }

	public function create() {
		$data = [
			'name' => $this->input->post('name'),
		];

		$this->Report_model->add_data($data);
		redirect('report');	
	}

    public function edit($id) {
		$data['data'] = $this->Report_model->get_data_by_id($id);
		
		$this->load->view('layouts/header');
		$this->load->view('report/form_edit', $data);
		$this->load->view('layouts/footer');
    }

	public function update($id) {
		$data = [
			'name' => $this->input->post('name'),
		];

		$this->Report_model->edit_data($id, $data);
		redirect('report');
	}

    public function delete($id) {
        $this->Report_model->delete_data($id);
        redirect('report');
    }
}
