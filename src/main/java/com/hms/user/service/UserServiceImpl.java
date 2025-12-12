package com.hms.user.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hms.user.dto.UserDTO;
import com.hms.user.entity.User;
import com.hms.user.exception.HmsException;
import com.hms.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service("userService")
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void registerUser(UserDTO userDTO) throws HmsException {
        Optional<User> opt = userRepository.findByEmail(userDTO.getEmail());
        if (opt.isPresent()) {
            throw new HmsException("USER_ALREADY_EXISTS");
        }
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        userRepository.save(userDTO.toEntity());
    }

    @Override
    public UserDTO loginUser(UserDTO userDTO) throws HmsException {
      User user= userRepository.findByEmail(userDTO.getEmail()).orElseThrow(
        ()->new HmsException("USER_NOT_FOUND"));
    if (!passwordEncoder.matches(userDTO.getPassword(), user.getPassword())) {
        throw new HmsException("IVALID_CREDENTIALS");
    }
    user.setPassword(null); //remove password trả về 
    return user.toDTO();
    }

    @Override
    public UserDTO getUserById(Long id) throws HmsException {
       
        return userRepository.findById(id).orElseThrow(()->new HmsException("USER_NOT_FOUND")).toDTO();
    }

    @Override
    public void updateUser(UserDTO userDTO) throws HmsException {
            // ví dụ simple update
        User user= userRepository.findByEmail(userDTO.getEmail()).orElseThrow(
        ()->new HmsException("USER_NOT_FOUND"));
        user.setEmail(userDTO.getEmail());
        user.setName(userDTO.getName());
        userRepository.save(user);
    }

    @Override
    public UserDTO getUser(String email) throws HmsException {
        // TODO Auto-generated method stub
        return userRepository.findByEmail(email).orElseThrow(()->new HmsException("USER_NOT_FOUND")).toDTO();
    }

}
