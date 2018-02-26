<?php

/**
 * Implements template_preprocess_html().
 */
function fmgautoadvancedfour_fmg_solr_count() {
  // Add Results text to solr count
  $count = fmg_solr_current_search_count();
  return '<div class="used-search-block-count">' . $count . ' <span>Results</span></div>';
}

function fmgautoadvancedfour_preprocess_html(&$variables) {
  // Add a couple of classes to the body element
  $variables['classes_array'][] = 'fmg--body-color__bg';
  $variables['classes_array'][] = 'fmg--text-color__text';
}

/**
 * Implements template_preprocess_page.
 */
function fmgautoadvancedfour_preprocess_page(&$variables) {

  /**
   * Add telephone numbers to footer
   */
  // Load the departments
  $departments = node_load_multiple(array(), array('type' => 'department'));
  // If departments exist
  if(isset($departments) && !empty($departments)) {
    // Start building up the content
    $details_output = '<section class="footer-contact-details"><h2 class="footer-contact-details__title"><i class="fa fa-comments-o" aria-hidden="true"></i>Get In Touch:</h2><ul class="footer-contact-details__list">';

    foreach($departments as $department) {
      // Foreach to load each tel number and add them
      foreach($department->field_telephone_numbers['und'] as $tel) {
        $term = taxonomy_term_load($tel['tid']);
        $details_output .= '<li><a href="tel:' . $term->field_phone['und'][0]['value'] . '">' . $term->field_phone['und'][0]['value'] . '</a></li>';
      }
    }

    // Add email us link to the end
    $details_output .= '<li><a href="/contact">Email Us</a></li>';

    // Close of the content and create a new variable to print
    // ** see page.tpl for printed content
    $details_output .= '</ul></section>';
    $variables['footer_contact_details'] = $details_output;
  }


  // ****
  // Set up extra sidebar class for use if used vehicle DS
  // ****

  // Check first the node is used_vehicle type
  if (isset($variables['node']) && $variables['node']->type == "used_vehicle") {
    // Check if the sidebar exists
    $sidebar = $variables['page']['sidebar'];
    // Set up the class name
    $sidebar_class = (empty($sidebar)) ? 'without-sidebar' : 'with-sidebar';
    // Set up the variable to use in the DS layout
    $variables['node']->sidebar_modifier_class = $sidebar_class;
  }

  // ****
  // Set up search block to be printed
  // ****
  // Check it's not the frontpage
  if (!$variables['is_front'] && empty($variables['page']['sidebar'])) {

    // Set up the search block itself
    $render_search_block = block_load('fmg_search_blocks', 'fmg_used_vehicle_search_block');
    $render_search_block_array = _block_get_renderable_array(_block_render_blocks(array(&$render_search_block)));

    // build the output
    $search_output = '<a class="search-opener search-opener--without-sidebar"><i class="fa fa-search" aria-hidden="true"></i> Search Our Used Stock</a>';
    $search_output .= '<div class="block-fmg-search-blocks--without-sidebar">';

    // render the block
    $search_output .= render($render_search_block_array);
    $search_output .= '</div>';

    // Create a new variable to print
    // ** see page.tpl for printed content
    $variables['search_without_sidebar'] = $search_output;

  }

}

/**
 * Implements template_preprocess_node.
 */
function fmgautoadvancedfour_preprocess_node(&$variables) {

  /**
   * Add vehicle telephone number to vehicle details page
   */

  // Check it's the vehicle details page
  if ($variables['type'] == "used_vehicle" && $variables['view_mode'] == "full") {
    // Set up the vehicle branch id
    $branchid = $variables['field_vehicle_branch_id']['und'][0]['value'];
    // Load the branches
    $branches = node_load_multiple(array(), array('type' => 'branch'));

    // Loop over the branches
    foreach ($branches as $branch) {
      // if the branch has an ID that matches the vehicle branch ID
      if (isset($branch->field_branch_id['und'][0]['value']) && $branch->field_branch_id['und'][0]['value'] == $branchid) {
        // Set the NID of branch for later
        $branchnid = $branch->nid;
        // Load the departments
        $departments = node_load_multiple(array(), array('type' => 'department'));
        // loop over the departments
        foreach($departments as $department) {
          // if the department has the branch target ID that matches the branch ID
          if (isset($department->field_branch['und'][0]['target_id']) && $department->field_branch['und'][0]['target_id'] == $branchnid) {
            // if the department has telephone numbers set and not empty
            if (isset($department->field_telephone_numbers) && !empty($department->field_telephone_numbers['und'][0]['tid'])) {
              // Load the first telenumber from the array
              $term = taxonomy_term_load($department->field_telephone_numbers['und'][0]['tid']);
              // Build up the vehicle telephone number to print in the ds layout
              $variables['vehicle_number'] = '<div class="vehicle-number"><span>Call us now on</span><i class="fa fa-phone" aria-hidden="true"></i><a href="tel:' . $term->field_phone['und'][0]['value'] . '">' . $term->field_phone['und'][0]['value'] . '</a></div>';
            }
          }
        }
      }
    }
  }
}

/**
* Override or insert variables into the page template for HTML output.
*/
function fmgautoadvancedfour_process_html(&$variables) {
  // Hook into color.module.
  if (module_exists('color')) {
    _color_html_alter($variables);
  }
}

function fmgautoadvancedfour_entity_view_alter(&$build, $type) {
  if ($type == 'node' && $build['#bundle'] == 'branch') {
    if (isset($build['#node']->field_branch_reg_office_option) && !empty($build['#node']->field_branch_reg_office_option)){
      if ($build['#node']->field_branch_reg_office_option[LANGUAGE_NONE][0]['value'] == FALSE) {
        if (isset($build['field_address'])) {
          unset($build['field_address']);
        }
      }
      else {
        if (isset($build['field_branch_reg_office_address'])) {
          unset($build['field_branch_reg_office_address']);
        }
      }
    }
  }
}
