require 'test_helper'

class CommitmentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @commitment = commitments(:one)
  end

  test "should get index" do
    get commitments_url, as: :json
    assert_response :success
  end

  test "should create commitment" do
    assert_difference('Commitment.count') do
      post commitments_url, params: { commitment: { activity_type: @commitment.activity_type, buy_in_cents: @commitment.buy_in_cents, description: @commitment.description, end_date: @commitment.end_date, name: @commitment.name, start_date: @commitment.start_date, thumbnail: @commitment.thumbnail } }, as: :json
    end

    assert_response 201
  end

  test "should show commitment" do
    get commitment_url(@commitment), as: :json
    assert_response :success
  end

  test "should update commitment" do
    patch commitment_url(@commitment), params: { commitment: { activity_type: @commitment.activity_type, buy_in_cents: @commitment.buy_in_cents, description: @commitment.description, end_date: @commitment.end_date, name: @commitment.name, start_date: @commitment.start_date, thumbnail: @commitment.thumbnail } }, as: :json
    assert_response 200
  end

  test "should destroy commitment" do
    assert_difference('Commitment.count', -1) do
      delete commitment_url(@commitment), as: :json
    end

    assert_response 204
  end
end
