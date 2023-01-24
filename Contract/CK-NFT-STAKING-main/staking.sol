// SPDX-License-Identifier: Unlicense
pragma solidity 0.8.7;

// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

// import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
interface IERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}

/**
 * @dev Required interface of an ERC721 compliant contract.
 */
interface IERC721 is IERC165 {
    /**
     * @dev Emitted when `tokenId` token is transferred from `from` to `to`.
     */
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables `approved` to manage the `tokenId` token.
     */
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);

    /**
     * @dev Emitted when `owner` enables or disables (`approved`) `operator` to manage all of its assets.
     */
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    /**
     * @dev Returns the number of tokens in ``owner``'s account.
     */
    function balanceOf(address owner) external view returns (uint256 balance);

    /**
     * @dev Returns the owner of the `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function ownerOf(uint256 tokenId) external view returns (address owner);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`, checking first that contract recipients
     * are aware of the ERC721 protocol to prevent tokens from being forever locked.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be have been allowed to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Transfers `tokenId` token from `from` to `to`.
     *
     * WARNING: Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address from,
        address to,
        uint256 tokenId
    ) external;

    /**
     * @dev Gives permission to `to` to transfer `tokenId` token to another account.
     * The approval is cleared when the token is transferred.
     *
     * Only a single account can be approved at a time, so approving the zero address clears previous approvals.
     *
     * Requirements:
     *
     * - The caller must own the token or be an approved operator.
     * - `tokenId` must exist.
     *
     * Emits an {Approval} event.
     */
    function approve(address to, uint256 tokenId) external;

    /**
     * @dev Returns the account approved for `tokenId` token.
     *
     * Requirements:
     *
     * - `tokenId` must exist.
     */
    function getApproved(uint256 tokenId) external view returns (address operator);

    /**
     * @dev Approve or remove `operator` as an operator for the caller.
     * Operators can call {transferFrom} or {safeTransferFrom} for any token owned by the caller.
     *
     * Requirements:
     *
     * - The `operator` cannot be the caller.
     *
     * Emits an {ApprovalForAll} event.
     */
    function setApprovalForAll(address operator, bool _approved) external;

    /**
     * @dev Returns if the `operator` is allowed to manage all of the assets of `owner`.
     *
     * See {setApprovalForAll}
     */
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    /**
     * @dev Safely transfers `tokenId` token from `from` to `to`.
     *
     * Requirements:
     *
     * - `from` cannot be the zero address.
     * - `to` cannot be the zero address.
     * - `tokenId` token must exist and be owned by `from`.
     * - If the caller is not `from`, it must be approved to move this token by either {approve} or {setApprovalForAll}.
     * - If `to` refers to a smart contract, it must implement {IERC721Receiver-onERC721Received}, which is called upon a safe transfer.
     *
     * Emits a {Transfer} event.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 tokenId,
        bytes calldata data
    ) external;
}


interface IERC721Receiver {
    /**
     * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4);
}


/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract StakeNFT {

    //State variabble
    uint private _stakingId = 0;
    address private NFTToken = 0xFC7FedA4B25144d751272b6F6F6E2725Ffd51a13;
    address private REWARDToken = 0xBE2095Dd1989942ef81610BAC0fA258b35362a8c;

    address private admin;
    uint private rate;

    //constructor
    constructor(){
        admin = msg.sender;
    }

    //enumerator
    enum StakingStatus {Active,  Claimed, Cancelled}

    //structs
    struct Staking {
        address staker;    
        address token;
        uint256 tokenId;
        uint256 releaseTime;
        StakingStatus status;
        uint256 StakingId;
    }

    //mapping
    mapping(uint256 => Staking) private _StakedItem; 


    //event
    event tokenStaked(address indexed staker, address indexed token, uint256 token_id, StakingStatus status, uint256 StakingId);
    event tokenClaimStatus(address indexed token, uint256 indexed token_id, StakingStatus indexed status, uint256 StakingId);
    event tokenClaimComplete(address indexed token, uint256 indexed token_id, StakingStatus indexed status, uint256 StakingId);
    event tokenCancelComplete(address indexed token, uint256 indexed token_id, StakingStatus indexed status, uint256 StakingId);

    //function to call another function
    function callStakeToken(address token, uint256[] memory _tokenID) public {
        require(token == NFTToken, "incorrect NFT to stake"); // hardcode the NFT smart contract to allow only specific NFT into staking, assume 0xd2...d005 as NFT contract address
        stakeToken(_tokenID);
    }

    //function to transfer NFT from user to contract
    function stakeToken(uint256[] memory tokenId) private {
        uint256 releaseTime = block.timestamp;

        for (uint256 i = 0; i < tokenId.length; i++) {
            IERC721(NFTToken).transferFrom(msg.sender,address(this),tokenId[i]); // User must approve() this contract address via the NFT ERC721 contract before NFT can be transfered
            
            uint256 currentStakingId = _stakingId;

            Staking memory staking = Staking(msg.sender, NFTToken, tokenId[i], releaseTime, StakingStatus.Active, currentStakingId);
            
            _StakedItem[_stakingId] = staking;
            _stakingId++;
            
            emit tokenStaked(msg.sender, staking.token, staking.tokenId, staking.status, currentStakingId);
        }
        
    }

    //function to view staked NFT
    function viewStake(uint256 stakingId)public view returns (Staking memory) {
        return _StakedItem[stakingId];
    }

    //function to check NFT stake duration status 
    function checkStake(uint256 stakingId, address staker) public returns (Staking memory) {
        Staking storage staking = _StakedItem[stakingId];
        
        require(staker == msg.sender,"You cannot check this staking as it is not listed under this address");
        require(staking.status == StakingStatus.Active,"Staking is not active or claimed");
        

        emit tokenClaimStatus(staking.token, staking.tokenId, staking.status, staking.StakingId);
        return _StakedItem[stakingId];

    }

    //function to claim reward token if NFT stake duration is completed
    function claimReward(uint256[] memory stakingId) public {
        uint256 totalAmount;

        for (uint256 i = 0; i < stakingId.length; i++) {
            Staking storage staking = _StakedItem[stakingId[i]];
            
            require(staking.staker == msg.sender,"You cannot cancel this staking as it is not listed under this address");
            require(staking.status == StakingStatus.Active,"Your reward is either not claimable yet or has been claimed");

            totalAmount += rate * (block.timestamp - staking.releaseTime) / 25 days;
            staking.releaseTime = block.timestamp;

            emit tokenClaimComplete(staking.token, staking.tokenId, staking.status, staking.StakingId);
        }

        IERC20(REWARDToken).transfer(msg.sender, totalAmount);
    }
    

    //function to cancel NFT stake
    function unStake(uint256[] memory stakingId) public  {
        uint256 totalAmount;
        for (uint256 i = 0; i < stakingId.length; i++) {
            Staking storage staking = _StakedItem[stakingId[i]];
            require(staking.staker == msg.sender,"You cannot cancel this staking as it is not listed under this address");
            require(staking.status == StakingStatus.Active,"Staking is either not active (Cancalled or in claiming process)");
            
            totalAmount += rate * (block.timestamp - staking.releaseTime) / 25 days;
            staking.status = StakingStatus.Cancelled;
            IERC721(staking.token).transferFrom(address(this), msg.sender, staking.tokenId);
            emit tokenCancelComplete(staking.token, staking.tokenId, staking.status, staking.StakingId);
        }
    }

    function withdraw(uint256 amount) public onlyAdmin {
        uint256 balance = IERC20(REWARDToken).balanceOf(address(this));
        require(balance >= amount, "The balance of this contract is less than the amount");
        IERC20(REWARDToken).transfer(msg.sender, amount);
    }
    //function to set reward rate per day
    function setRewardRate(uint256 newRate) external onlyAdmin {
        rate = newRate;
    }

    function getRewardRate() external view returns (uint256) {
        return rate;
    }

    function getTotalStaked() external view returns (uint256) {
        return _stakingId;
    }
    modifier onlyAdmin{
        require(admin == msg.sender, "OA");
        _;
    }

    function setNewAdmin(address newAdd) external onlyAdmin{
        admin = newAdd;
    }

}