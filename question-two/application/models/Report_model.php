<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Report_model extends CI_Model {

	public function __construct() {
		parent::__construct();
		$this->load->database();
	}

    public function get_data() {
		return $this->db->get('reports')->result_array();
    }

	public function get_data_by_id($id) {
		return $this->db->get_where('reports', ['id' => $id])->row_array();
	}

    public function add_data($data) {
        $this->db->insert('reports', $data);
    }

    public function edit_data($id, $data) {
        $this->db->where('id', $id);
        $this->db->update('reports', $data);
    }

    public function delete_data($id) {
        $this->db->where('id', $id);
        $this->db->delete('reports');
    }
}
